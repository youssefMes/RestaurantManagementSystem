import { gql } from 'apollo-boost';

export const getUsersQuery = gql`
    {
        users{
            username
            email
        }
    }
    
`;

export const getOrdersQuery = gql`
    {
        orders
        {
            name
            id
            price
            creation
            menu{
                id
                name
            }
            user {
               username
               email
            }
        }
    }
    
`;
export const getMenusQuery = gql`
    {
        menus{
            name
            id
            price
        }
    }
    
`;
export const getMenusAndUsersQuery = gql`
    {
        menus{
            name
            id
            price
        }
        users{
            id
            username
            email
        }
    }  
`;
export const AddOrderMutation = gql`
    mutation($name: String!, $price: Float!, $userId: ID!, $menuId: ID!){
        addOrder(name: $name, price: $price, userId: $userId, menuId: $menuId){
        name
        id
        }
    }
`;

export const AddMenuMutation = gql`
    mutation($name: String!, $price: Float!, $type: String!){
        addMenu(name: $name, price: $price, type: $type){
        name
        id
        type
        }
    }
    
`;

export const AddUserMutation = gql`
    mutation($username: String!, $email: String!){
        addUser(username: $username, email:$email){
        username
        email
        id        
        }
    }
    
`;