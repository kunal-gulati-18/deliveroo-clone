import { Text, View } from 'react-native';
import FeaturedRowItems from './FeaturedRowItems';

const FeaturedRow = () => {
  return (
    <View>
       <FeaturedRowItems id="1" title="Featured" description='Select from a set of featured dishes.'/> 
       <FeaturedRowItems id="2" title="Tasty Discounts" description='Feasty discounts for you'/> 
       <FeaturedRowItems id="3" title="Offers near you!" description='Offers to smash your plate'/> 
    </View>
  )
}

export default FeaturedRow