import { createRoot } from 'react-dom/client'
import './index.scss'
import MyRouter from './MyRouter.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <MyRouter />
  </>,
)
