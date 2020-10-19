import baseJson from './base.json'
import template1 from './template1.json'

export const LOCAL_TEMPLATE_LIST = 'LOCAL_TEMPLATE_LIST';

let localTemplateList = JSON.parse(localStorage.getItem(LOCAL_TEMPLATE_LIST) || '[]');
export const saveLocalJson = (json:any) => {
  const index = localTemplateList.findIndex((item:any) => {
    return item.name === json.name
  })
  if (index !== -1) {
    localTemplateList.splice(index, 1);
  }
  localTemplateList.push({
    name: json.name,
    json: json
  })
  localStorage.setItem(LOCAL_TEMPLATE_LIST, JSON.stringify(localTemplateList));
}

export function getLocalTemplateList(){
  localTemplateList = JSON.parse(localStorage.getItem(LOCAL_TEMPLATE_LIST) || '[]');
  return [
    {
      name: '基础模板',
      json: baseJson,
    },
    {
      name: '模板一',
      json: template1,
    },
    ...localTemplateList
  ]
}