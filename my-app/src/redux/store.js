import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './slices/paymentSlice.js';
import requestReducer from './slices/requestSlice.js';
import tenantReducer from './slices/tenantSlice.js'
import authReducer from './slices/authSlice/authSlice.js';
import shopReducer from './slices/shopSlice/shopSlice'; 
import apartmentReducer from './slices/apartmentSlice/apartmentSlice';  
import updateReducer from './slices/updateSlice/updateSlice';  

const store = configureStore({
  reducer: {
    payments: paymentReducer,
    requests: requestReducer,
    tenants: tenantReducer,
    auth: authReducer,
    shop: shopReducer,  
    apartment: apartmentReducer, 
    update: updateReducer, 
  },
});

export default store;
