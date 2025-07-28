import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    useGetOrderDetailsQuery, usePayOrderMutation,
    // usePayOrderInCashMutation,
    // useReceivedPaymentInCashMutation,
    useGetPayPalClientIdQuery, useDeliverOrderMutation
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    // const [payOrderInCash, { isLoading: loadingPayCash }] = usePayOrderInCashMutation();

    // const [receivedPaymentInCash, { isLoading: loadingPaymentReceivedInCash }] = useReceivedPaymentInCashMutation();

    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Order is paid');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        });
    }

    // async function onApproveCash() {
    //     await payOrderInCash({ orderId, details: { payer: {} } });
    //     refetch();
    //     toast.success('Order is Cash On Delivery(COD)');
    // }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    // const cashHandler = async () => {
    //     try {
    //         await receivedPaymentInCash(orderId);
    //         refetch();
    //         toast.success("Payment Received as Cash On Delivery");
    //     } catch (err) {
    //         toast.error(err?.data?.message || err.message);
    //     }
    // }

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Order delivered");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger"> {error.data.message} </Message>
    ) : (
        <>
            <h1>Order {order._id} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode}, {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Paid
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />

                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? <Loader /> : (
                                        <div>
                                            {/* <div>
                                                <Button onClick={onApproveCash} style={{ marginBottom: '10px' }}>Cash On Delivery (COD)</Button>
                                            </div> */}
                                            <div>
                                                <PayPalButtons createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}></PayPalButtons>
                                            </div>

                                        </div>

                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}

                            {/* {userInfo && userInfo.isAdmin && !order.isPaid && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={cashHandler}>
                                        Payment Received (Cash On Delivery)
                                    </Button>
                                </ListGroup.Item>
                            )} */}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
};
export default OrderScreen;
