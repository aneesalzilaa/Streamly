import * as usercontroller from '../controller/usercontroller.js';
import express from 'express';
import { protectRoute } from '../Middleware/authmiddleware.js';

const router = express.Router();

router.get('/', protectRoute, usercontroller.getRecommendedUsers);
router.get('/friends', protectRoute, usercontroller.getMyFriends);
router.post('/friends/request/:id', protectRoute, usercontroller.sendFriendRequest);
router.put('/friends/accept/:id', protectRoute, usercontroller.acceptFriendRequest);
router.get('/friend-requests', protectRoute, usercontroller.getFriendRequests);
router.get('/friend-requests/outgoing', protectRoute, usercontroller.getOutgoingFriendReqs);

export default router;
