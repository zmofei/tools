import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.css'
import lanPick from '@/components/i18n/languageFn'
import React, { useEffect, useState, useRef } from 'react'


function getTimeStr(date: Date): { txt: string, num: number } {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return {
    "txt": `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`,
    "num": (hour + 1) * 100 + (minute / 60) * 100 + (second / 60) * 10,
  }
}

export default function Home({ lan }: any) {

  const currentTimeZone = new Date().getTimezoneOffset() / 60 * -1
  const newDefaultTimezones = Array.from(new Set([currentTimeZone, ...[-8, 2, 8]]).values())

  const [timeNow, setTimeNow] = useState(new Date(0))
  const [hoverRowIndex, setHoverRowIndex] = useState(-1)
  const [hoverColumnIndex, setHoverColumnIndex] = useState(-1)
  const [newTimeZone, setNewTimeZone] = useState<string | number>('')
  const [timezones, setTimezones] = useState(newDefaultTimezones)

  function _updateLocalStorage(newTimeZones: number[]) {
    localStorage.setItem('timezones', JSON.stringify(newTimeZones))
  }

  function timeZoneInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTimeZone(Number(e.target.value))
  }

  function timeZoneInputConfirm(e: React.KeyboardEvent) {
    if (e.key == 'Enter') {
      if (newTimeZone !== '' && newTimeZone <= 14 && newTimeZone >= -12) {
        if (!timezones.includes(Number(newTimeZone))) {
          const newTimeZones = [...timezones, Number(newTimeZone)]
          setTimezones(newTimeZones)
          _updateLocalStorage(newTimeZones)
        }
        setNewTimeZone('')
      }
    }
  }

  function moveToRight(index: number) {
    const newTimeZones: number[] = [...timezones];
    [newTimeZones[index], newTimeZones[index + 1]] = [newTimeZones[index + 1], newTimeZones[index]];
    setTimezones(newTimeZones)
    setHoverColumnIndex(-1)
    _updateLocalStorage(newTimeZones)
  }

  function moveToLeft(index: number) {
    const newTimeZones: number[] = [...timezones];
    [newTimeZones[index - 1], newTimeZones[index]] = [newTimeZones[index], newTimeZones[index - 1]];
    setTimezones(newTimeZones)
    setHoverColumnIndex(-1)
    _updateLocalStorage(newTimeZones)
  }

  function deleteTimeZone(index: number) {
    const newTimeZones: number[] = [...timezones];
    newTimeZones.splice(index, 1)
    setTimezones(newTimeZones)
    setHoverColumnIndex(-1)
    _updateLocalStorage(newTimeZones)
  }


  useEffect(() => {
    // reorder timezones
    try {
      let cachedTimeZones = localStorage.getItem('timezones');
      if (cachedTimeZones) {
        let newTimezones = JSON.parse(cachedTimeZones)
        setTimezones(newTimezones)
      }
    } catch (e) {
    }

    // update time
    setTimeNow(new Date())
    const timeCount = setInterval(() => {
      setTimeNow(new Date())
    }, 1000)
    return () => {
      clearInterval(timeCount)
    }
  }, [])



  return (
    <>
      <Head>
        <title>Time difference</title>
        <meta name="description" content="Time difference" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerContext}>
          <h2>Timezone compare</h2>
          <div className={styles.timeInputArea}>
            <label>
              <input
                placeholder='+ Input new timezone here & press Entry, -12 ~ 14'
                className={styles.timeInput}
                onChange={timeZoneInputChange}
                onKeyUp={timeZoneInputConfirm}
                value={newTimeZone}
                type="number"
                min={-12}
                max={14}
                step={1}
              />
            </label>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div>
          <div className={styles.realTime} style={{ transform: `translate(0%, ${getTimeStr(timeNow).num}%)` }}>
            <span className={styles.realTimeText}>{getTimeStr(timeNow)['txt']}</span>
          </div>
          <div className={styles.timeLists}>
            {timezones.map((timezone, timezoneIndex) => {
              const isHover = hoverColumnIndex == timezoneIndex
              return (<ul
                key={`timeZone_${timezone}`}
                onMouseEnter={() => setHoverColumnIndex(timezoneIndex)}
                onMouseLeave={() => setHoverColumnIndex(-1)}
              >
                <li className={styles.timeListLiHead}>
                  {(timezoneIndex > 0 && isHover) && (
                    <span
                      className={styles.timeListLeft}
                      onClick={() => {
                        moveToLeft(timezoneIndex)
                      }}
                    >
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16887" width="16" height="16"><path d="M670.977781 808.954249c-5.300726 0-10.596336-2.045589-14.603603-6.126534L368.69006 509.86743c-7.818059-7.961322-7.818059-20.717857 0-28.67918l287.684118-292.960285c7.92039-8.065699 20.877493-8.182356 28.942169-0.26299 8.065699 7.919367 8.182356 20.877493 0.264013 28.942169L411.976936 495.526817l273.603425 278.620695c7.918343 8.064676 7.801686 21.022803-0.264013 28.942169C681.331593 807.002804 676.153664 808.954249 670.977781 808.954249z" p-id="16888" fill="#ffffff"></path></svg>
                    </span>
                  )}
                  <span>
                    {timezoneIndex == 0 && (
                      <span>
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8834" width="16" height="16"><path d="M771.104 692.416V256.448a30.944 30.944 0 0 0-9.6-22.912 34.528 34.528 0 0 0-24-9.536c-18.624 0.32-33.568 14.784-33.568 32.448v435.968L569.632 565.12a33.792 33.792 0 0 0-23.84-9.664c-9.024 0-17.632 3.488-23.872 9.664a31.008 31.008 0 0 0-9.92 22.592c0 8.512 3.584 16.64 9.92 22.592L712 790.432c6.176 6.08 14.656 9.504 23.52 9.536 8.896 0.32 17.568-2.624 24.192-8.256l190.08-180.128A30.4 30.4 0 0 0 960 588.992a30.4 30.4 0 0 0-10.24-22.592 34.56 34.56 0 0 0-23.84-9.408c-8.96 0-17.536 3.392-23.84 9.408L771.104 692.416zM88.864 736h398.24c13.76 0 24.896 14.176 24.896 31.68 0 17.504-11.136 31.68-24.896 31.68H88.896C75.136 799.36 64 785.184 64 767.68 64 750.176 75.136 736 88.896 736z m1.792-256h266.688c14.72 0 26.656 14.176 26.656 31.68 0 17.504-11.936 31.68-26.656 31.68H90.656C75.936 543.36 64 529.184 64 511.68 64 494.176 75.936 480 90.656 480z m396.48-256H88.864C75.136 224 64 238.176 64 255.68c0 17.504 11.136 31.68 24.896 31.68h398.208c13.76 0 24.896-14.176 24.896-31.68 0-17.504-11.136-31.68-24.896-31.68z" fill="#666" p-id="8835"></path></svg>
                      </span>
                    )}
                    <span> UTC {timezone > 0 ? '+' : ''}{timezone}</span>
                  </span>
                  {((timezoneIndex < timezones.length - 1) && isHover) && (
                    <span className={styles.timeListRight}
                      onClick={() => {
                        moveToRight(timezoneIndex)
                      }}
                    >
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2126" width="16" height="16"><path d="M383.291616 808.954249c-5.175883 0-10.353812-1.950422-14.338566-5.862521-8.064676-7.919367-8.182356-20.877493-0.26299-28.942169l273.602402-278.620695L368.69006 216.907145c-7.919367-8.064676-7.801686-21.022803 0.26299-28.942169 8.065699-7.918343 21.022803-7.80271 28.942169 0.26299l287.685141 292.960285c7.818059 7.961322 7.818059 20.717857 0 28.67918L397.895219 802.826692C393.887952 806.907637 388.591319 808.954249 383.291616 808.954249z" p-id="2127" fill="#ffffff"></path></svg>
                    </span>
                  )}
                  {(isHover && timezones.length > 1) && (
                    <span className={styles.timeListDelete}
                      onClick={() => {
                        deleteTimeZone(timezoneIndex)
                      }}
                    >
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10020" width="16" height="16"><path d="M608 768c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32zM416 768c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32zM928 224H768v-64c0-52.928-42.72-96-95.264-96H352c-52.928 0-96 43.072-96 96v64H96c-17.696 0-32 14.304-32 32s14.304 32 32 32h832c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-608-64c0-17.632 14.368-32 32-32h320.736C690.272 128 704 142.048 704 160v64H320v-64z" p-id="10021" fill="#ffffff"></path><path d="M736.128 960H288.064c-52.928 0-96-43.072-96-96V383.52c0-17.664 14.336-32 32-32s32 14.336 32 32V864c0 17.664 14.368 32 32 32h448.064c17.664 0 32-14.336 32-32V384.832c0-17.664 14.304-32 32-32s32 14.336 32 32V864c0 52.928-43.072 96-96 96z" p-id="10022" fill="#ffffff"></path></svg>
                    </span>
                  )}
                </li>
                {[...Array(24)].map((item, index) => {
                  let currentTime = (index - (timezones[0] - timezone))
                  currentTime = currentTime < 0 ? currentTime + 24 : currentTime
                  currentTime = currentTime > 24 ? currentTime - 24 : currentTime
                  const workTime = currentTime % 24 >= 9 && currentTime % 24 < 18
                  return <li
                    key={`time_${index}`}
                    className={`${styles[workTime ? 'workTime' : '']} ${styles.timeList} ${styles[hoverRowIndex == index ? 'activeRow' : '']}`}
                    onMouseEnter={() => setHoverRowIndex(index)}
                    onMouseLeave={() => setHoverRowIndex(-1)}
                  >
                    {`0${currentTime % 24}`.slice(-2)}:00
                  </li>
                })}
              </ul>)
            })}
          </div>
        </div>


      </main>
      <footer className={styles.footer}>
        By{' '}
        <a
          href={`https://www.${lanPick(lan, { "zh": "zhuwenlong", "en": "himofei" })}.com`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/mofei-logo.svg"
            alt="Mofei Logo"
            className={styles.vercelLogo}
            width={50}
            height={24}
            priority
          />
        </a>
        <span className={styles.descriptionEmoji}>❤️</span>
        <a href={`https://www.nextjs.org`}
          target="_blank"
          rel="noopener noreferrer">
          <Image
            src="/next.svg"
            alt="nextjs Logo"
            className={styles.vercelLogo}
            width={50}
            height={24}
            priority
          />
        </a>
      </footer>
    </>
  )
}
