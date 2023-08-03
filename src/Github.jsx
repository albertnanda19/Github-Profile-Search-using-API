import React from "react";

const API = 'https://api.github.com/users';

class Github extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'albertnanda19',
            name: '',
            avatar: '',
            location: '',
            repos: '',
            followers: '',
            following: '',
            homeUrl: '',
            notFound: '',
        };
    }

    fetchProfile(username) {
        let url = `${API}/${username}`;
        fetch(url).then((res) => res.json())
        .then((data) => {
            this.setState({
                username: data.login,
                name: data.name,
                avatar: data.avatar_url,
                location: data.location,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                homeUrl: data.html_url,
                notFound: data.message,
            });
        })
        .catch((error) => console.log('Oops! There\'s a problem'));
    }

    componentDidMount() {
        this.fetchProfile(this.state.username);
    }

    render() {
        return(
            <>
                <section className="flex flex-col justify-center items-center">
                    <SearchProfile fetchProfile={this.fetchProfile.bind(this)}/>
                    <Profile data={this.state}/>
                </section>
            </>
        )
    }
}

class SearchProfile extends React.Component{
    handleForm(e) {
        e.preventDefault();
        let username = this.refs.username.value;
        this.props.fetchProfile(username);
        this.refs.username.value = ''
    }

    render() {
        return(
            <>
                <form onSubmit={this.handleForm.bind(this)} className="flex justify-center items-center pt-24">
                    <label>
                        <input type="search" ref="username" placeholder="Ketik username lalu tekan enter" className="w-[20rem] text-base outline-none p-4 text-center rounded-tr-xl rounded-tl-xl bg-gray-300"/>
                    </label>
                </form>
            </>
        );
    }
}

class Profile extends React.Component{
    render() {
        let data = this.props.data;
        let followers = `${data.homeUrl}/followers`;
        let repositories = `${data.homeUrl}?tab=repositories`;
        let following = `${data.homeUrl}/following`;

        if(data.notFound === 'Not Found'){
            return(
                <div>
                    <h2>Oops !!!</h2>
                    <p>Could't Find Your Username. Try Again</p>
                </div>
            );
        }else{
            return(
                <section className="bg-white w-[20rem] rounded-bl-xl rounded-br-xl mb-12 mx-4">
                    <div className="flex flex-col justify-center items-center py-8">
                        <a href={data.homeUrl} target="_blank" title={data.name || data.username} rel="noreferrer 
                        noopener" className=" flex justify-center items-center py-4">
                            <img src={data.avatar} alt={data.username} className="rounded-full w-1/2 h-auto" />
                        </a>
                        <h2 className="text-primary text-2xl font-semibold">
                            <a href={data.homeUrl} title={data.username} target="_blank" rel="noreferrer noopener">
                                {data.name || data.username}
                            </a>
                        </h2>
                        <h3>{data.location || 'I live in my mind'}</h3>
                    </div>
                    <div className="flex justify-center items-center pb-8 gap-4 rounded-bl-xl rounded-br-xl bg-black">
                        <div className="pt-6">
                            <a href={followers} target="_blank" title="Jumlah Followers" rel="noreferrer noopener" className="flex flex-col justify-center items-center">
                                <i className="text-secondary font-bold">{data.followers}</i>
                                <span className="font-bold text-white">Followers</span>
                            </a>
                        </div>
                        <div className="pt-6">
                            <a href={repositories} target="_blank" title="Jumlah Followers" rel="noreferrer noopener" className="flex flex-col justify-center items-center">
                                <i className="text-secondary font-bold">{data.repos}</i>
                                <span className="font-bold text-white">Repository</span>
                            </a>            
                        </div>
                        <div className="pt-6">
                            <a href={following} target="_blank" title="Jumlah Followers" rel="noreferrer noopener" className="flex flex-col justify-center items-center">
                                <i className="text-secondary font-bold">{data.following}</i>
                                <span className="font-bold text-white">Following</span>
                            </a>            
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default Github;