import json from '@rollup/plugin-json';

export default {
    input: './server.js',
    plugins: [json()],
}