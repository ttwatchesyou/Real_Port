import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workStudies } from '@/data/workArchive';
import { workSourceNotes } from '@/data/workSourceNotes';
import { WorkDetail } from '@/components/work/WorkNotebook';

export const dynamicParams = false;
export function generateStaticParams(){return workStudies.map(study=>({slug:study.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params,study=workStudies.find(s=>s.slug===slug);
  return {
    title:study?.title.th??'Project',
    description:study?.summary.th,
    alternates:{canonical:`/work/${slug}`},
    openGraph:{title:study?`${study.title.th} — Theetawatch`:'Project — Theetawatch',description:study?.summary.th,url:`/work/${slug}`,images:study?.photos?.[0]?[{url:study.photos[0].src,width:study.photos[0].width,height:study.photos[0].height,alt:study.title.th}]:undefined},
  };
}
export default async function StudyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params,study=workStudies.find(s=>s.slug===slug);
  if(!study)notFound();
  const data={'@context':'https://schema.org','@type':'CreativeWork',name:study.title.th,description:study.summary.th,inLanguage:['th','en','zh-CN'],author:{'@type':'Person',name:'Theetawatch tangtakulltanakit'},image:study.photos?.map(photo=>photo.src)};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/><WorkDetail study={study} source={workSourceNotes[slug]}/></>;
}
