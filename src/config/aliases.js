const aliases = (prefix = `src`) => ({
    "@layouts": `${prefix}/layouts`,
    "@components": `${prefix}/components`,
    "@images": `${prefix}/assets/img`,
    "@hooks": `${prefix}/hooks`,
    "@auth": `${prefix}/pages/auth`,
    "@sub-module": `${prefix}/pages/sub-module`,
    "@api": `${prefix}/api`,
    "@contexts": `${prefix}/contexts`,
	"@settings": `${prefix}/pages/settings`,
});

module.exports = aliases;
