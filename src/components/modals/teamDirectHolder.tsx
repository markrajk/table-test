import React, { useEffect } from 'react'

interface Props {
    getFeedbacks(): void
}
const TeamDirect= (props: Props) => {
    const { getFeedbacks } = props
    useEffect(() => {
        getFeedbacks()
    })
    return(
        null
    )
}
export default TeamDirect