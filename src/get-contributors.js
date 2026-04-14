#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { program } = require('commander')

;(async () => {
    program
        .argument('<repository>', 'Full Repository (example: "user/repo")')
        .option('-f, --file <filepath>', 'Output File', '.vitepress/contributors.json')
        .option('-m, --max-users <number>', 'Max Contributors, 0 is unlimited', (val) => Number(val), 0)
        .option('-k, --keys <list,of,keys>', 'Specify Keys to Save', 'login,avatar_url')
        .option('-b, --bots', 'Include Bot Users', false)
        .option('-e, --error', 'Throw Errors', false)
        .option('-G, --github <url>', 'Specify a Custom GitHub API', 'https://api.github.com')
        .option('-F, --forgejo <url>', 'Specify Forgejo/Gitea API')

    program.parse()

    const repo = program.args[0]
    console.log('repo:', repo)
    const options = program.opts()
    console.log('options:', options)
    const origin = parseOrigin(options.forgejo || options.github)
    console.log('origin:', origin)

    fs.mkdirSync(path.dirname(options.file), { recursive: true })

    let data = []
    try {
        if (options.forgejo) {
            data = await getForgejo(origin, repo, options)
        } else {
            data = await getGithub(origin, repo, options)
        }
    } catch (e) {
        console.error(e)
        if (options.error) {
            throw e
        }
    }
    console.log('data:', data)
    console.log(`get-contributors - total contributors: ${data.length}`)
    fs.writeFileSync(options.file, JSON.stringify(data), 'utf8')
})()

/**
 * Parse Origin URL
 * @param {string} input
 * @return {string}
 */
function parseOrigin(input) {
    console.log('parseOrigin:', input)
    if (!input.includes('://')) input = `https://${input}`
    const url = new URL(input)
    return url.origin
}

/**
 * Get GitHub Contributors
 * @param {string} origin
 * @param {string} repo
 * @param {object} options
 * @return {Promise<[object]>}
 */
async function getGithub(origin, repo, options) {
    console.log('getGithub:', origin, repo, options)
    const results = []
    const perPage = 100
    let page = 1

    const keys = options.keys.split(',').map((k) => k.trim())
    console.log('keys:', keys)

    while (true) {
        const url = `${origin}/repos/${repo}/contributors?per_page=${perPage}&page=${page}`
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

        const filtered = !options.bots ? contributors.filter((c) => c.type === 'User') : contributors
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
        if (options.maxUsers > 0 && results.length >= options.maxUsers) break
        page++
        await new Promise((resolve) => setTimeout(resolve, 250))
    }

    // console.log('results.length:', results.length)
    return options.maxUsers > 0 ? results.slice(0, options.maxUsers) : results
}

/**
 * Get Forgejo Contributors
 * @param {string} origin
 * @param {string} repo
 * @param {object} options
 * @return {Promise<[object]>}
 */
async function getForgejo(origin, repo, options) {
    console.log('getForgejo:', origin, repo, options)
    const contributorsMap = new Map()
    const perPage = 100
    let page = 1

    const keys = options.keys.split(',').map((k) => k.trim())
    console.log('keys:', keys)

    const baseUrl = `${origin}/api/v1`
    console.log('baseUrl:', baseUrl)

    while (true) {
        const url = `${baseUrl}/repos/${repo}/commits?limit=${perPage}&page=${page}`
        console.log('url:', url)
        const response = await fetch(url, { headers: { Accept: 'application/json' } })
        console.log('response.status:', response.status)
        if (!response.ok) break

        const commits = await response.json()
        console.log('commits.length:', commits.length)
        if (!commits?.length) break

        for (const item of commits) {
            // console.log('item:', item)
            const user = item.author
            if (user && !contributorsMap.has(user.login)) {
                // console.log('user:', user)
                if (!options.bots && user.login.includes('[bot]')) continue
                const mappedUser = keys.reduce((obj, key) => {
                    obj[key] = user[key]
                    return obj
                }, {})
                contributorsMap.set(user.login, mappedUser)
            }

            if (options.maxUsers > 0 && contributorsMap.size >= options.maxUsers) break
        }

        if (commits.length < perPage || (options.maxUsers > 0 && contributorsMap.size >= options.maxUsers)) {
            break
        }
        page++
        await new Promise((r) => setTimeout(r, 200))
    }

    return Array.from(contributorsMap.values())
}
