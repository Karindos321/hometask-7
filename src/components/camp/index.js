import { useContext } from 'react';
import CampIcon from './camp-table.png';
import './style.css';
import GoodsContext from '../../context/goods.context';

const CampComponent = (/*{selectedGoods, removeAllGoods} */) => {
 const { removeAllGoods, selectedGoods } = useContext(GoodsContext);
 const TotalPointsGoods =selectedGoods.reduce((acc,item)=> acc + item.cost, 0);
 const isCampEnabled = TotalPointsGoods => 40;





 const campClick = () => {
  if(isCampEnabled){
    removeAllGoods();
  }
 };

  return (
    <div className="camp">
      <img
        src={CampIcon}
        onClick={campClick}
        className={isCampEnabled ? '' : 'disabled'}
        alt="Camp Icon"
      />
    </div>
 );
};

export default CampComponent;