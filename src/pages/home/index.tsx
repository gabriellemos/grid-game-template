import Board from 'components/Board'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('home.greetings')}</h1>
      <Board width={5} height={5} />
    </div>
  )
}

export default Home
