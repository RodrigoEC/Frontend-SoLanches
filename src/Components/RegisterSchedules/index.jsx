import { useEffect, useState } from 'react/cjs/react.development'
import { Button } from '../Button'
import { Schedule } from '../Schedule'

import style from './style.module.css'

export const RegisterSchedules = () => {
  const [schedules, setSchedules] = useState([
    { day: '', opens: '', closes: '' },
  ])

  const handleClick = () => {
    let schedulesCopy = schedules
    schedulesCopy.push({ day: '', opens: '', closes: '' })
    setSchedules([...schedulesCopy])
  }

  return (
    <div className={style.wrapper}>
      <div className={style.schedulesContainer}>
        {schedules.map((schedule, index) => {
          return (
            <Schedule
              schedule={schedule}
              schedules={schedules}
              setSchedules={setSchedules}
              index={index}
            />
          )
        })}
      </div>
      <div className={style.scheduleAdd} onClick={handleClick}>
        <Button title="Adicionar horário" />
      </div>
    </div>
  )
}
