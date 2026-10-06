import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workStudies } from '@/data/workArchive';
import { workSourceNotes } from '@/data/workSourceNotes';
import { WorkDetail } from '@/components/work/WorkNotebook';

export const dynamicParams = false;
export function generateStaticParams(){return workStudies.map(study=>({slug:study.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params,study=workStudies.find(s=>s.slug===slug);
  return {title:study?`${study.title.th} — Theetawatch`:'Project — Theetawatch',description:study?.summary.th};
}
export default async function StudyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params,study=workStudies.find(s=>s.slug===slug);
  if(!study)notFound();
  return <WorkDetail study={study} source={workSourceNotes[slug]}/>;
}
