import type { CardType } from "@/types/board/card"
import CheckboxDemo from "./ui/checkbox"

type CardDetailProps = {
    data: CardType
}

export const CardDetail = ({data}:CardDetailProps) => {
    console.log(data)
    return (
        <div className="w-full h-full">
            
            {/* cover */}
            <div className={`bg-cover w-full border-b-1 ${data.cover ? 'h-50' : 'h-15'}`} style={{backgroundImage:`"url(${data.cover})"`}}>
                
            </div>
            {/* Content */}
            <div className="w-full">
                <div>
                    <label>{data.label}</label>
                </div>

            </div>
        </div>
    )
}