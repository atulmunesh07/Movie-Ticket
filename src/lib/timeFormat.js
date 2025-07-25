const timeFormat = (minutes)=>{
    const hours =Math.floor(minutes/60)
    const minutehands = minutes%60
    return `${hours}h ${minutehands}m`
}
export default timeFormat