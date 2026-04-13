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
        .option('--forgejo <url>', 'Use Forgejo/Gitea API')

    program.parse()

    const repo = program.args[0]
    const options = program.opts()
    const maxUsers = Number(options.maxUsers)
    const keys = options.keys.split(',').map((k) => k.trim())

    console.log(`get-contributors - ${repo}`, options)

    fs.mkdirSync(path.dirname(options.file), { recursive: true })

    let data = []
    try {
        data = await getContributors(repo, maxUsers, !options.bots, keys, options)
    } catch (e) {
        console.error(e)
        if (options.error) {
            throw e
        }
    }
    console.log(`get-contributors - total contributors: ${data.length}`)
    fs.writeFileSync(options.file, JSON.stringify(data), 'utf8')
})()

async function getContributors(repo, maxUsers, filterBots, keys, options) {
    if (options.forgejo) {
        const host = options.forgejo.replace(/\/$/, '')
        const baseUrl = `${host}/api/v1`
        const contributorsMap = new Map()
        const perPage = 100
        let page = 1

        while (true) {
            const url = `${baseUrl}/repos/${repo}/commits?limit=${perPage}&page=${page}`
            const response = await fetch(url, { headers: { Accept: 'application/json' } })

            if (!response.ok) break

            const commits = await response.json()
            if (!commits || !commits.length) break

            for (const item of commits) {
                const user = item.author 

                if (user && !contributorsMap.has(user.login)) {
                    if (filterBots && (user.login.includes('[bot]') || user.type === 'Bot')) {
                        continue
                    }
                    
                    const mappedUser = keys.reduce((obj, key) => {
                        obj[key] = user[key]
                        return obj
                    }, {})

                    contributorsMap.set(user.login, mappedUser)
                }

                if (maxUsers > 0 && contributorsMap.size >= maxUsers) break
            }

            if (commits.length < perPage || (maxUsers > 0 && contributorsMap.size >= maxUsers)) break
            page++
            await new Promise((r) => setTimeout(r, 200))
        }

        return Array.from(contributorsMap.values())
    }
    else {
        const results = []
        const perPage = 100
        let page = 1

        while (true) {
            const url = `https://api.github.com/repos/${repo}/contributors?per_page=${perPage}&page=${page}`
            const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })

            if (!response.ok) break

            const contributors = await response.json()
            if (!contributors || !contributors.length) break

            const filtered = filterBots ? contributors.filter((c) => c.type === 'User') : contributors

            const mapped = filtered.map((c) =>
                keys.reduce((obj, key) => {
                    obj[key] = c[key]
                    return obj
                }, {})
            )

            results.push(...mapped)

            if (contributors.length < perPage || (maxUsers > 0 && results.length >= maxUsers)) break
            page++
            await new Promise((r) => setTimeout(r, 250))
        }

        return maxUsers > 0 ? results.slice(0, maxUsers) : results
    }
}
