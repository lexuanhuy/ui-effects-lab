#!/usr/bin/env zx
import { $, usePowerShell } from 'zx';
import chalk from 'chalk';
import { writeFileSync } from 'fs';

// script is only for powershell
usePowerShell();

let component = await question('Nhập tên component: ');
let name = await question('Nhập tên hiệu ứng: ');
let path = `public/components/${component}/${name}`;

const metaContent = {
    id: `${name}-${component}`,
    name: name,
    category: component,
    tags: `${component},${name}`
};

let exists = await $`Test-Path -Path "${path}"`;
if (exists.stdout.trim() === 'True') {
    console.log(chalk.red(`Lỗi: Thư mục ${path} đã tồn tại!`));
    process.exit(1);
}

console.log(chalk.blue(`Đang tạo ${path}...`));

await $`mkdir -p ${path}`;
writeFileSync(`${path}/style.css`, '');
console.log(chalk.green(`Đã tạo xong style.css!`));
writeFileSync(`${path}/meta.json`, JSON.stringify(metaContent, null, 2));
console.log(chalk.green(`Đã tạo xong meta.json!`));
writeFileSync(`${path}/index.html`, '<link rel="stylesheet" href="style.css" />');
console.log(chalk.green(`Đã tạo xong index.html!`));
writeFileSync(`${path}/main.js`, '');
console.log(chalk.green(`Đã tạo xong main.js!`));

console.log(chalk.green(`ĐÃ TẠO XONG TẤT CẢ FILE!`));