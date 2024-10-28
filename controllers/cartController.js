import userModel from "../models/userModel.js"


// add products to user cart
// add products to user cart
const addToCart = async (req, res) => {
    try {
      console.log(req.auth);
      if (!req.auth) {
        return res.json({ success: false, message: "User is not authenticated" });
      }
  
      const { itemId } = req.body;
      const userId = req.auth._id;
  
      const userData = await userModel.findById(userId);
      let cartItems = userData.cartItems || {};
  
      if (cartItems[itemId]) {
        cartItems[itemId] += 1;
      } else {
        cartItems[itemId] = 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartItems });
  
      res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
// update user cart
const updateCart = async (req,res) => {
    try {
        
        const { userId ,itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req,res) => {

    try {
        
        const { userId } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }