let apiall:Api = {}
const modules = await import.meta.glob('./*.ts', { eager: true })
for (const path in modules) {
  const name = path.split(/[\/\.]/)[2]
   apiall[name]=modules[path]
}
export default apiall