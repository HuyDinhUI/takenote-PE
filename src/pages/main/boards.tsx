import { Board, BoardContainer, BoardWorkspace } from "@/components/ui/board"
import { Clock, Rocket, Star, Info, ChartColumnBig } from "lucide-react"


const Boards = () => {
    console.log('boards')
    return (
        <div className="flex-1 min-h-[100vh] pt-4 px-30">
            {/* Starred */}
            <BoardContainer icon={<Star color="gray" />} title="Starred boards">
                <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
            </BoardContainer>
            {/* Viewed */}
            <BoardContainer icon={<Clock color="gray" />} title="Recently viewed">
                <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
                <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
            </BoardContainer>
            {/* Your Workspace */}
            <BoardWorkspace label="your workspace">
                <BoardContainer icon={<Rocket />} title="Trello Workspace">
                    <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
                    <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
                    <Board type="default" title="Create new board"/>
                </BoardContainer>
            </BoardWorkspace>
            {/* Guest Workspace */}
            <BoardWorkspace label="guest workspace" icon={<Info size={18}/>}>
                <BoardContainer icon={<ChartColumnBig />} title="Trello Templates">
                    <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
                    
                </BoardContainer>
            </BoardWorkspace>
        </div>
    )
}

export default Boards