const aliases = (prefix = `src`) => ({
  "@layouts": `${prefix}/layouts`,
  "@components": `${prefix}/components`,
  "@images": `${prefix}/assets/img`,
  "@hooks": `${prefix}/hooks`,
  "@auth": `${prefix}/pages/auth`,
  "@users": `${prefix}/pages/settings/users`,
  "@groups": `${prefix}/pages/settings/groups`,
  "@permissions": `${prefix}/pages/settings/permissions`,
  "@sector": `${prefix}/pages/property-management/sector`,
  "@sites": `${prefix}/pages/property-management/site`,
  "@levels": `${prefix}/pages/property-management/level`,
  "@api": `${prefix}/api`,
});

module.exports = aliases;
