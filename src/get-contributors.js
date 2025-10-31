#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { program } = require('commander')

;(async () => {
    program
        .argument('<repository>', 'Full Repository (example: "user/repo")')
        .option('-f, --file <filepath>', 'Output File', '.vitepress/contributors.json')
        .option('-m, --max-users <number>', 'Max Contributors, 0 is unlimited', '0')
        .option('-k, --keys <list,of,keys>', 'Specify Keys to Save', 'login,avatar_url')
        .option('-b, --bots', 'Include Bot Users', false)
        .option('-e, --error', 'Throw Errors', false)

    program.parse()

    const repo = program.args[0]
    const options = program.opts()
    const maxUsers = Number(options.maxUsers)
    const keys = options.keys.split(',').map((k) => k.trim())
    // console.log('keys:', keys)
    console.log(`get-contributors - ${repo}`, options)

    fs.mkdirSync(path.dirname(options.file), { recursive: true })

    let data = []
    try {
        data = await getContributors(repo, maxUsers, !options.bots, keys)
    } catch (e) {
        console.error(e)
        if (options.error) {
            throw e
        }
    }
    console.log(`get-contributors - total contributors: ${data.length}`)
    fs.writeFileSync(options.file, JSON.stringify(data), 'utf8')
})()

/**
 * Get GitHub Contributors
 * @param {String} repo
 * @param {Number} maxUsers
 * @param {Boolean} filter
 * @param {String[]} keys
 * @property {String} login
 * @property {String} type
 * @property {String} avatar_url
 * @return {Promise<[Object]>}
 */
async function getContributors(
    repo,
    maxUsers = 0,
    filter = true,
    keys = ['login', 'avatar_url']
    //
) {
    const results = []
    const perPage = 100
    let page = 1

    while (true) {
        const url = `https://api.github.com/repos/${repo}/contributors?per_page=${perPage}&page=${page}`
        // console.log(`fetch url: ${url}`)
        const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
        // console.log('response.status:', response.status)
        if (!response.ok) {
            console.error(`response.status: ${response.status} - url: ${url}`)
            break
        }

        const contributors = await response.json()
        // console.log('contributors.length:', contributors.length)
        if (!contributors.length) break

        const filtered = filter ? contributors.filter((c) => c.type === 'User') : contributors
        // console.log('filtered.length:', filtered.length)

        // const mapped = filtered.map((c) => ({ login: c.login, avatar_url: c.avatar_url }))
        const mapped = filtered.map((c) =>
            keys.reduce((obj, key) => {
                obj[key] = c[key]
                return obj
            }, {})
        )
        // console.log('mapped.length:', mapped.length)

        results.push(...mapped)
        // console.log('contributors.length:', contributors.length)
        if (contributors.length < perPage) break
        // console.log('results.length:', results.length)
        if (maxUsers > 0 && results.length >= maxUsers) break
        page++
        await new Promise((resolve) => setTimeout(resolve, 250))
    }

    // console.log('results.length:', results.length)
    return maxUsers > 0 ? results.slice(0, maxUsers) : results
}
