export default defineAppConfig({
  icon: {
    customize: (content: string, name?: string, prefix?: string) =>
      prefix === 'ph' && name === 'anchor-bold'
        ? content.replaceAll('currentColor', 'red')
        : content,
  },
})
