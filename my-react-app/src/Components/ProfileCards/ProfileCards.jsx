import React from 'react';
import "./ProfileCards.css";
import users from "../../Datas/Users"


function ProfileCards() {

   {}

  return (
    <div className='card-grid'>
        { users.map(user =>
            <div className='card'>
                 <div className='top-card'>
                        <div className='top-left'>
                            <img src={user.profile.image} ></img>

                        </div>
                        <div className='top-right'>
                            <p>{user.name}</p>
                            <p>{user.bio}</p>
                        </div>
                    </div>
            </div>
            
        )}
    </div>
  )
}

export default ProfileCards
