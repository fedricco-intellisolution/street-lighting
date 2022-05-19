const aliases = (prefix = `src`) => ({
    '@layouts': `${prefix}/layouts`,
    '@components': `${prefix}/components`,
    '@images': `${prefix}/assets/img`,
    '@hooks': `${prefix}/hooks`,
    '@auth': `${prefix}/pages/auth`,
    '@users': `${prefix}/pages/settings/users`,
    '@groups': `${prefix}/pages/settings/groups`,
    '@permissions': `${prefix}/pages/settings/permissions`,
});

module.exports = aliases;