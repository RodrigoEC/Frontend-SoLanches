import { ServiceHours } from '../ServiceHours'
import { Button } from '../Button'
import Instagram from '../../assets/icons/instagram.svg'
import Facebook from '../../assets/icons/facebook.svg'
import Mail from '../../assets/icons/mail.svg'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { getCommerce } from '../../services/api'

export const CommerceInfo = ({ commerceName }) => {
  const [commerceInfo, setCommerceInfo] = useState(null)
  const [socialMedia, setSocialMedia] = useState({})

  useEffect(() => {
    async function getCommerceProducts() {
      const commerceInfoData = await getCommerce(commerceName)
      console.log(commerceInfoData.attributes)
      setCommerceInfo(commerceInfoData.attributes)
      setSocialMedia(commerceInfoData.attributes.social_media)
    }

    getCommerceProducts()
  }, [])

  return (
    commerceInfo && (
      <div className={styles.container}>
        <div className={styles.commerce_image}>
          <img
            src='https://misscheckindotcom1.files.wordpress.com/2018/05/contato-chiozinho-sergipe-foto-do-blog-misscheck-in.jpg?w=640'
            alt='loja'
          />
        </div>
        <h1>{commerceInfo.name}</h1>
        <div className={styles.social_medias}>
          <a
            href={socialMedia ? socialMedia.instagram : ''}
            target='_blank'
            rel='noreferrer'
          >
            <img src={Instagram} alt='Instagram' />
          </a>

          <a
            href={socialMedia ? socialMedia.facebook : ''}
            target='_blank'
            rel='noreferrer'
          >
            <img src={Facebook} alt='Facebook' />
          </a>

          <a
            href={socialMedia ? `mailto:${socialMedia.email}` : ''}
            target='_blank'
            rel='noreferrer'
          >
            <img src={Mail} alt='Email' />
          </a>
        </div>
        <div className={styles.address}>
          <span>{commerceInfo.endereco}</span>
        </div>
        <div className={styles.buttons}>
          <a
            href={`https://wa.me/55${commerceInfo.phone}?text=Olá!%20Eu%20gostaria%20de%20fazer%20um%20pedido.`}
            target='_blank'
            rel='noreferrer'
          >
            <Button title='Contate-nos' icon={Whatsapp} />
          </a>
          <ServiceHours hours={commerceInfo.horarios} />
        </div>
      </div>
    )
  )
}
