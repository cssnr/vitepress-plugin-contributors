#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { program } = require('commander')

;(async () => {
    program
        .argument('<repository>', 'Full Repository (example: "user/repo")')
        .option('-f, --file <filepath>', 'Output File', '.vitepress/contributors.json')
        .option('-m, --max-users <number>', 'Max Contributors, 0 is unlimited', '0')
        .option('-b, --bots', 'Include Bot Users', false)

    program.parse()

    const repo = program.args[0]
    const options = program.opts()
    const maxUsers = Number(options.maxUsers)
    console.log(`get-contributors - ${repo}`, options)

    fs.mkdirSync(path.dirname(options.file), { recursive: true })

    let data = []
    try {
        data = await getContributors(repo, maxUsers, !options.bots)
    } catch (e) {
        console.warn(e)
    }
    if (maxUsers > 0) data = data.slice(0, maxUsers)
    console.log(`get-contributors - total contributors: ${data.length}`)
    fs.writeFileSync(options.file, JSON.stringify(data), 'utf8')
})()

/**
 * Get GitHub Contributors
 * @param {String} repo
 * @param {Number} maxUsers
 * @param {Boolean} filter
 * @property {String} login
 * @property {String} type
 * @property {String} avatar_url
 * @return {Promise<[Object]>}
 */
async function getContributors(repo, maxUsers = 0, filter = true) {
    const results = []
    const perPage = 100
    let page = 1

    while (true) {
        const url = `https://api.github.com/repos/${repo}/contributors?per_page=${perPage}&page=${page}`
        const data = { headers: { Accept: 'application/vnd.github+json' } }

        const response = await fetch(url, data)
        // console.log('response.status:', response.status)
        if (!response.ok) break

        const contributors = await response.json()
        // console.log('contributors.length:', contributors.length)
        if (!contributors.length) break

        const filtered = filter ? contributors.filter((c) => c.type === 'User') : contributors
        // console.log('filtered.length:', filtered.length)

        const mapped = filtered.map((c) => ({
            username: c.login,
            avatar: c.avatar_url,
        }))
        // console.log('mapped.length:', mapped.length)

        results.push(...mapped)
        // console.log('results.length:', results.length)
        if (contributors.length < perPage) break
        if (maxUsers > 0 && results.length >= maxUsers) break
        page++
        await new Promise((resolve) => setTimeout(resolve, 250))
    }

    return results
}
