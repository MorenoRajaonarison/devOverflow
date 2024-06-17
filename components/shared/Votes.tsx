"use client"
import { getFormattedNumber } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface Props{
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasupVoted: boolean
  downvotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
}

function Votes({type, itemId,userId, upvotes, hasupVoted,downvotes,hasdownVoted, hasSaved}: Props) {
  const handelsave = () => {

  }

  const handleVotes = (type: string) => {}
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image alt="up" src={hasupVoted ? "/assets/icons/upvoted.svg": "/assets/icons/upvote.svg"} width={18} height={18} className='cursor-pointer' onClick={() =>handleVotes('up')}/>
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1" >
            <p className="subtle-medium text-dark400_light900">{getFormattedNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image alt="down" src={hasdownVoted ? "/assets/icons/downvoted.svg": "/assets/icons/downvote.svg"} width={18} height={18} className='cursor-pointer' onClick={() =>handleVotes('down')}/>
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1" >
            <p className="subtle-medium text-dark400_light900">{getFormattedNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      <Image alt="saved" src={hasSaved ? "/assets/icons/star-filled.svg": "/assets/icons/star-red.svg"} width={18} height={18} className='cursor-pointer' onClick={handelsave}/>

    </div>
  )
}

export default Votes