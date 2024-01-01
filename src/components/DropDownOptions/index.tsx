"use client"
import { useEffect, useState } from "react";
import { Check, ChevronDown, Circle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import useQuiz from '../../../app/store'

import config from 'next/config';
  type CategoryType = {
    id:number,
    name:string
  }

  const Type = ['boolean', 'multiple']
  const Level = ['easy', 'medium', 'hard']
  
export default function DropOptions() {
    
    const [categories, setCategories] = useState<CategoryType[]>([])
    
    const config = useQuizConfig((state:any) => state.config);
    const addCategory = useQuiz(state => state.addCategory)
    const addLevel= useQuiz(state => state.addLevel)
    const addType = useQuiz(state => state.addType)
    
    useEffect(()=>{
        async function fetchCategory(){
            const {trivia_categories} = await (await fetch('https://opentdb.com/api_category.php')).json()
            setCategories([...trivia_categories])
        }
        fetchCategory()
    })
  return (
    <section className='flex justify-evenly items-center py-5 w-full' >
   <div className='px-7 py-4 w-1/3 mx-4'>
   <DropdownMenu>
  <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-10 py-3 hover:bg-blue-600 hover:text-gray-100 rounded-lg'>{config.category.name?config.category.name:'CATEGORY'} CATEGORY <ChevronDown/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Category </DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
        categories.map(category =>  <DropdownMenuItem key={category.name} onClick={()=> addCategory(category.id, category.name)}>{category.name}</DropdownMenuItem>)
    }
   
  </DropdownMenuContent>
</DropdownMenu>
   </div>
   
   <div className='px-7 py-4 w-1/3 mx-4'>
   <DropdownMenu>
  <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-10 py-3 hover:bg-blue-600 hover:text-gray-100 rounded-lg'> LEVEL <ChevronDown/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Level</DropdownMenuLabel>
    <DropdownMenuSeparator />
   {
    Level.map(e =>   <DropdownMenuItem onClick={()=>addLevel(e)} key={e}>{e}</DropdownMenuItem>)
   }
  
  </DropdownMenuContent>
</DropdownMenu>
   </div>
   <div className='px-7 py-4 w-1/3 mx-4'>
   <DropdownMenu>
  <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-10 py-3 hover:bg-blue-600 hover:text-gray-100 rounded-lg'> TYPE <ChevronDown/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Type</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
    Type.map(e =>   <DropdownMenuItem onClick={()=> addType(e)} key={e}>{e}</DropdownMenuItem>)
   }
  </DropdownMenuContent>
</DropdownMenu>
   </div>
    </section>
  )
}



function useQuizConfig(arg0: (state: any) => any) {
    throw new Error("Function not implemented.");
}
// function useState<T>(arg0: never[]): [any, any] {
//     throw new Error('Function not implemented.')
//}

