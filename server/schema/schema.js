const graphql = require('graphql');
const _ = require('lodash');
const Order = require('../models/order');
const User = require('../models/user');
const Menu = require('../models/menu');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
} = graphql;

const OrderType = new GraphQLObjectType({
    name:'Order',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
        user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(Users, {id: parent.userId})
                return User.findById(parent.userId);
            }
        },
        menu: {
            type: new GraphQLList(MenuType),
            resolve(parent, args){
                // return _.filter(Orders, {userId: parent.id})
                return Menu.find(parent.menuId);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name:'User',
    fields: () => ({
        id: {type: GraphQLID },
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args){
                // return _.filter(Orders, {userId: parent.id})
                return Order.find({userId: parent.id});
            }
        }
    })
});

const MenuType = new GraphQLObjectType({
    name:'Menu',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLFloat)},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        order: {
            type: OrderType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // get data from db
                // return _.find(Orders, {id: args.id});
                return Order.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // get data from db
                // return _.find(Users, {id: args.id});
                return User.findById(args.id);
            }
        },
        menu: {
            type: MenuType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // get data from db
                // return _.find(Users, {id: args.id});
                return Menu.findById(args.id);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args){
                // return Orders;
                return Order.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // return Users;
                return User.find({});
            }
        },
        menus: {
            type: new GraphQLList(MenuType),
            resolve(parent, args){
                // return Users;
                return Menu.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let user = new User({
                    username: args.username,
                    email: args.email
                });
                return user.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                price: {type: GraphQLNonNull(GraphQLFloat)},
                userId: {type: GraphQLNonNull(GraphQLID)},
                menuId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let order = new Order({
                    name: args.name,
                    price: args.price,
                    userId: args.userId,
                    menuId: args.menuId,
                });
                return order.save();
            }
        },
        addMenu: {
            type: MenuType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                price: {type: GraphQLNonNull(GraphQLFloat)},
                type: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let menu = new Menu({
                    name: args.name,
                    price: args.price,
                    type: args.type,
                });
                return menu.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});