#!/usr/bin/env zx
import { $, usePowerShell } from 'zx';
import chalk from 'chalk';

// script is only for powershell
usePowerShell();

let component = await question('Nhập tên component: ');
let name = await question('Nhập tên hiệu ứng: ');
let path = `public/components/${component}/${name}`;

let exists = await $`Test-Path -Path "${path}"`;
if (exists.stdout.trim() === 'True') {
    console.log(chalk.red(`Lỗi: Thư mục ${path} đã tồn tại!`));
    process.exit(1);
}

console.log(chalk.blue(`Đang tạo ${path}...`));

await $`mkdir -p ${path}`;
await $`echo "" > ${path}/style.css`;
console.log(chalk.green(`Đã tạo xong ${path}/style.css!`));
await $`echo '{\n\t"id": "",\n\t"name": "${name}",\n\t"category": "${component}",\n\t"tags": "${component},${name}"\n}' > ${path}/meta.json`;
console.log(chalk.green(`Đã tạo xong ${path}/meta.json!`));
await $`echo '<link rel="stylesheet" href="style.css" />' > ${path}/index.html`
console.log(chalk.green(`Đã tạo xong ${path}/index.html!`));
await $`echo '' > ${path}/main.js`;
console.log(chalk.green(`Đã tạo xong ${path}/main.js!`));

console.log(chalk.green(`ĐÃ TẠO XONG TẤT CẢ FILE TRONG ${path}/`));