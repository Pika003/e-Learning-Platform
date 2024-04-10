import React from 'react'

function StudentCourses() {
  return (
    <div className='flex gap-10 pl-48 mx-48 mt-12 flex-wrap justify-center'>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
          <p>Physics</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
          <p>Chemistry</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
          <p>Biology</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
          <p>Math</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
          <p>Computer</p>
        </div>
    </div>
  )
}

export default StudentCourses