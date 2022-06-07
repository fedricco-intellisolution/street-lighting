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
  "@areas": `${prefix}/pages/property-management/area`,
  "@preventive": `${prefix}/pages/preventive-maintenance`,
  "@fault": `${prefix}/pages/fault`,
  "@api": `${prefix}/api`,
  "@contexts": `${prefix}/contexts`,
});

module.exports = aliases;
