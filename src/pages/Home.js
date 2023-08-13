import Overview from '../components/Overview'
import style from './Home.module.css'
import Transactions from '../components/Transactions'
import DynamicDisplay from '../components/DynamicDisplay';
export default function Home() {
 
  return (
    <>
    <div>
      <div className={style.upper}>
      <Overview/>
      <DynamicDisplay/>
      
     </div>
     <Transactions/>
    </div>
   </>
  )
}
