import Link from "next/link"
import { FC } from "react"
import { categoryItems } from "../../utils/siteInfo"

export const ProductMenu: FC = ({ }): JSX.Element => {

    return (
        <div className='h-full w-full flex flex-col lg:flex-row md:flex-row text-white'>
            {categoryItems.map(({ category, listItems }) => {
                return (
                    <div key={category} className='lg:w-1/3 w-full h-full flex-col justify-start items-start p-6'>
                        <Link  href={`/products/${category.toLowerCase()}`}><h2 className='cursor-pointer p-0 max-w-fit hover:opacity-50'>{category}</h2></Link>
                        <ul className='w-full' style={{ color: 'rgb(140,140,140)' }}>
                            {listItems.map(({ title }) => <li key={title}>
                                <Link href={`/products/${category.toLowerCase()}/${title.toLowerCase()}`}>
                                    <p className='cursor-pointer p-0 max-w-fit hover:opacity-50'>{title}</p>
                                </Link>
                            </li>)}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}