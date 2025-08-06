const Razorpay = require('razorpay');
const crypto = require('crypto');

// Check if Razorpay keys are configured
const isRazorpayConfigured = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

// Initialize Razorpay only if keys are available
let razorpay = null;
if (isRazorpayConfigured) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

module.exports.createOrder = async (req, res) => {
    try {
        if (!isRazorpayConfigured) {
            return res.status(500).json({
                success: false,
                message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment variables.'
            });
        }

        console.log('Request body received:', req.body);
        const { amount, currency = 'INR', receipt } = req.body;
        
        console.log('Extracted values:', { amount, currency, receipt });
        
        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
            console.error('Invalid amount received:', amount);
            return res.status(400).json({
                success: false,
                message: 'Invalid amount provided. Amount must be a positive number. Received: ' + amount
            });
        }

        // Convert amount to paise (Razorpay expects amount in paise)
        const amountInPaise = Math.round(parseFloat(amount) * 100);
        
        console.log('Creating order with amount:', {
            originalAmount: amount,
            amountInPaise: amountInPaise,
            currency: currency,
            receipt: receipt
        });
        
        const options = {
            amount: amountInPaise,
            currency: currency,
            receipt: receipt,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        
        console.log('Order created successfully:', order.id);
        
        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error('Payment order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order: ' + (error.error?.description || error.message || 'Unknown error')
        });
    }
};

module.exports.verifyPayment = async (req, res) => {
    try {
        if (!isRazorpayConfigured) {
            return res.status(500).json({
                success: false,
                message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment variables.'
            });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Verify the payment signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is verified, save booking details
            // The booking will be saved in the frontend after verification
            res.json({
                success: true,
                message: 'Payment verified successfully',
                paymentDetails: {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed'
        });
    }
};

module.exports.getPaymentDetails = async (req, res) => {
    try {
        if (!isRazorpayConfigured) {
            return res.status(500).json({
                success: false,
                message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment variables.'
            });
        }

        const { paymentId } = req.params;
        const payment = await razorpay.payments.fetch(paymentId);
        
        res.json({
            success: true,
            payment: payment
        });
    } catch (error) {
        console.error('Payment details error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details'
        });
    }
}; 