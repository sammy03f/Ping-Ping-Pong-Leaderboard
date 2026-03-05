let players = [
{name:"Sammy", rating:1000},
{name:"Kabir", rating:1000},
{name:"Bubnack", rating:1000},
{name:"Aaron", rating:1000},
{name:"Sonny", rating:1000},
{name:"JJ", rating:1000},
{name:"Ramji", rating:1000},
{name:"Aadi (squid)", rating:1000}
]

const K = 32

function expectedScore(Ra,Rb){
return 1/(1+Math.pow(10,(Rb-Ra)/400))
}

function updateElo(playerA,playerB,winner){

let Ea = expectedScore(playerA.rating,playerB.rating)
let Eb = expectedScore(playerB.rating,playerA.rating)

let Sa = winner === "A" ? 1 : 0
let Sb = winner === "B" ? 1 : 0

playerA.rating = Math.round(playerA.rating + K*(Sa-Ea))
playerB.rating = Math.round(playerB.rating + K*(Sb-Eb))
}

function renderLeaderboard(){

players.sort((a,b)=>b.rating-a.rating)

let table = document.querySelector("#leaderboard tbody")
table.innerHTML=""

players.forEach((p,i)=>{
let row = `<tr>
<td>${i+1}</td>
<td>${p.name}</td>
<td>${p.rating}</td>
</tr>`
table.innerHTML += row
})

populatePlayers()
}

function populatePlayers(){

let a = document.getElementById("playerA")
let b = document.getElementById("playerB")

a.innerHTML=""
b.innerHTML=""

players.forEach((p,i)=>{
a.innerHTML += `<option value=${i}>${p.name}</option>`
b.innerHTML += `<option value=${i}>${p.name}</option>`
})
}

document.getElementById("matchForm").addEventListener("submit",function(e){

e.preventDefault()

let aIndex = document.getElementById("playerA").value
let bIndex = document.getElementById("playerB").value
let winner = document.getElementById("winner").value

if(aIndex===bIndex){
alert("Players must be different")
return
}

updateElo(players[aIndex],players[bIndex],winner)

renderLeaderboard()
})

renderLeaderboard()