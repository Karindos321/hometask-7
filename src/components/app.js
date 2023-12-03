import { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods';
import CounterComp from './counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import CampComponent from './camp';

const goods = GoodsMock.map(el => ({
 ...el,
 id: uuid.v1()
}));

const AppComponent = () => {

 const [data, setData] = useState(goods);
 const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return [...prevSelectedGoods, item];
  });
 };

 const removeGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return prevSelectedGoods.filter(el => {
    // if (item.id === el.id) {
    //  return false;
    // } else {
    //  return true;
    // }
    return item.id !== el.id;
   });
  });
 };

 const removeAllGoods = () => {
  setData((prevData) => {
   return prevData.filter(el => {
    const exists = selectedGoods.find(item => item.id == el.id);
    return !exists;
   });
  });
  setSelectedGoods([]);
 };

 const AutoDetectButton = ({ data }) => {
    const [selectedFruits, setSelectedFruits] = useState([]);
  
    const findBestCombination = (startIndex, targetSum, currentCombination) => {
      if (targetSum === 0) {
        setSelectedFruits([...currentCombination]);
        return;
      }
  
      for (let i = startIndex; i < data.length; i++) {
        const newCombination = [...currentCombination, data[i]];
        const newTargetSum = targetSum - data[i];
  
        findBestCombination(i + 1, newTargetSum, newCombination);
      }
    };
  
    const handleAutoDetectClick = () => {
      const targetSum = 40;
      findBestCombination(0, targetSum, []);
    };
  
    return (
      <div>
        <button onClick={handleAutoDetectClick}>auto-detect</button>
        <div>
          <strong>Selected Fruits:</strong> {selectedFruits.join(', ')}
        </div>
      </div>
    );
  };
  
  

 return (
  <div className='app'>
   <div className='wrapper'>
    <GoodsContext.Provider value={{
     selectedGoods: selectedGoods,
     addGoods,
     removeGoods,
     removeAllGoods,
    }}>
     <CounterComp />
     <div className='goods-wrapper'>
      {
       data.map(el => {
        // return <GoodsComponent cost={el.cost} imageSrc={el.imageSrc} title={el.title} />;
        return <GoodsComponent {...el} key={el.id} />;
       })
      }
     </div>
     {/* <GoodsComponent cost={20} title='title' imageSrc='./images/goods-1.webp' /> */}
     <CampComponent />
    </GoodsContext.Provider>
   </div>
  </div>
 );
};

export default AppComponent;;