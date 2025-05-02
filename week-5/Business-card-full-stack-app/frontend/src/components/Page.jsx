import { useState, useEffect } from 'react';
import { UserCard } from './UserCard';

export function Page(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [interests, setInterests] = useState('');
  const [userCards, setUserCards] = useState([]);

  useEffect(function () {
  
    async function fetchCards() {
      try {
        const res = await fetch('http://localhost:3000/');
        if (res.ok) {
          const cards = await res.json();
          const newCards = cards.map(function(card){
            return{
              ...card,
              interestString: card.interests.join(',')
            }
          });
          setUserCards(newCards);
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchCards();
  }, []);
    
    async function submitToDatabase(){
        const data = {
            name,
            description,
            linkedinUrl: linkedin,
            twitterUrl:  twitter,
            interestString: interests   
          };
        try {
            const response = await fetch('http://localhost:3000/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              const error = await response.text();   
              console.error('Server error:', error);
              return;                                
            }
            const result = await response.json();
            console.log(result);
            
            setName('');
            setDescription('');
            setLinkedin('');
            setTwitter('');
            setInterests('');
            setUserCards(function(prev){return [...prev, data]});
        }
        catch(err){
            console.log("Fetch failed", err);
        }
    };
    return <div>
        <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}></input><br></br>
        <input type="text" placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></input><br></br>
        <input type="text" placeholder="your-linkedin-url" value={linkedin} onChange={e => setLinkedin(e.target.value)}></input><br></br>
        <input type="text" placeholder="your-twitter-url" value={twitter} onChange={e => setTwitter(e.target.value)}></input><br></br>
        <input type="text" placeholder="interests" value={interests} onChange={e => setInterests(e.target.value)}></input><br></br>
        <button onClick={submitToDatabase}>Submit</button><br></br>
        {userCards.map(function(userCard) {return (
          <div><UserCard name = {userCard.name} description = {userCard.description} linkedin = {userCard.linkedinUrl}
          twitter = {userCard.twitterUrl} interests = {userCard.interestString.split(",").map(function(interest){return interest.trim()})}></UserCard></div>
        )})}
    </div>
}