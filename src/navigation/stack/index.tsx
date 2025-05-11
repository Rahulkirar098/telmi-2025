import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {auhtNavigation} from '../routes';
import {BottomTab} from '../bottom';

const AuthStack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        headerShown: false,
      }}>
      {auhtNavigation.map((item, index) => (
        <AuthStack.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
      <AuthStack.Screen
        name="bottom_tab"
        component={BottomTab}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};
