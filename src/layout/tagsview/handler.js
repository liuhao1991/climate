/*
 * @Author: lh@metgs.com
 * @Date: 2021-11-08 18:12:28
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-07 14:09:11
 * @Description: ...
 */
import path from 'path'

export const filterAffixTags = (routes, basePath = '/') => {
  const tags = []
  routes.forEach((route) => {
    // Must have tag name
    if (route.meta && route.meta.affix && route.name) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
  })
  return tags
}
