/* eslint-disable no-lone-blocks */
import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const FEED_QUERY = gql`
{
  feed {
    links {
      id
      createdAt
      url
      description
      postedBy {
          id
          name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
}
`
class LinkList extends Component {
  
  // render() {
  //   const linksToRender = [
  //     {
  //       id: '1',
  //       description: 'Prisma turns your database into a GraphQL API 😎',
  //       url: 'https://www.prismagraphql.com',
  //     },
  //     {
  //       id: '2',
  //       description: 'The best GraphQL client',
  //       url: 'https://www.apollographql.com/docs/react/',
  //     },
  //   ]

  //   return (
  //     <Query query={FEED_QUERY}>
  //       {(something) => 
  //         linksToRender.map(link => <Link key={link.id} link={link} />)
  //       }
  //     </Query>
  //   )
  // }

  _updateCacheAfterVote = (store, createVote, linkId) => {
    try {
    const data = store.readQuery({ query: FEED_QUERY, variables:{}})
    console.log(data)
    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes
  
    store.writeQuery({ query: FEED_QUERY, data })
    } catch (e) {
      console.log(e);
      console.log("Not updating store - Projects not loaded yet");
    }
  }
  
  render() {
    return (
      <React.Fragment>
      <Query fetchPolicy="no-cache" query={FEED_QUERY}>
        {({ loading, error, data, refetch }) => {
          {/* var min = 1;
          var max = 100;
          var rand =  parseInt(min + (Math.random() * (max-min)));
          console.log(rand)
          if (rand%2===0) return <div>even</div> */}
          if (loading) return <div>Fetching</div>
          if (error) return <div>error${error.message}</div>
          this.refetch = refetch;
          const linksToRender = data.feed.links
          console.log("query")
          // <Query query={FEED_QUERY}>
          // ...
          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link 
                  key={link.id} 
                  link={link} 
                  index={index} 
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
              ))}
            </div>
          )
          // ...
          // </Query>
        }}
      </Query>
      <button onClick={()=>this.refetch()}>Refetch</button>
      </React.Fragment>
    )
  }
}

export default LinkList