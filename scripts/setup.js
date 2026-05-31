import { cpSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root  = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nm    = path.join(root, 'node_modules');
const pub   = path.join(root, 'public');

const copies = [
  { src: path.join(nm, '@titaniumnetwork-dev', 'ultraviolet', 'dist'), dest: path.join(pub, 'uv') },
  { src: path.join(nm, '@mercuryworkshop', 'bare-mux', 'dist'),        dest: path.join(pub, 'baremux') },
  { src: path.join(nm, '@mercuryworkshop', 'epoxy-transport', 'dist'), dest: path.join(pub, 'epoxy') },
];

for (const { src, dest } of copies) {
  if (!existsSync(src)) { console.warn(`Missing: ${src}`); continue; }
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true, force: true });
  console.log(`✓  ${path.basename(dest)}`);
}
