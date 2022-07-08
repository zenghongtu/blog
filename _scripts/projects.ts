import { writeFileSync } from 'fs';
import { Octokit } from 'octokit';
import { resolve } from 'path';

const token = process.env.github_token;

const octokit = new Octokit({
	auth: token,
});

const excludeNames = ['Mob'];
const cwd = process.cwd();

const run = async () => {
	const { data } = await octokit.request('GET /user/repos', {
		affiliation: 'owner',
		per_page: 100,
		sort: 'updated',
	});
	const projects: { name: string; url: string; desc: string; stars: number }[] = data
		.filter((item) => !excludeNames.includes(item.name))
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.slice(0, 15)
		.map((item) => {
			return {
				desc: item.description || '',
				url: item.html_url,
				name: item.name,
				stars: item.stargazers_count,
			};
		});
	const jsonStr = JSON.stringify(projects.slice(0, 5), null, 2);
	const md = projects
		.map((item) => {
			return `- [${item.name}](${item.url}) (${item.stars}⭐️)\n` + `${item.desc}`;
		})
		.join('\n');
	writeFileSync(resolve(cwd, './source/_data/projects.json'), jsonStr);
	writeFileSync(
		resolve(cwd, './source/projects/index.md'),
		`
---
title: My Projects
---

# My Projects

${md}
	`
	);
};

run();
