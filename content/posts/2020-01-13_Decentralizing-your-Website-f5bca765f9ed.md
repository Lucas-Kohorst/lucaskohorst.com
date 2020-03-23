+++ 
date = "2020-01-13"
title = "Decentralizing your Website"
slug = "decentralizing-your-website" 
tags = ['IPFS', 'ENS', 'Blockchain']
categories = []
+++

#### IPFS + ENS {#3cd5 .graf .graf--h4 .graf-after--h3 .graf--subtitle name="3cd5"}

![](https://cdn-images-1.medium.com/max/800/1*JV-liQv_Va530pu6_5Qe4g.jpeg)

[unsplash.com/photos/Q1p7bh3SHj8](https://unsplash.com/photos/Q1p7bh3SHj8)

When hosting a website usually you use a dedicated
[VPS](https://en.wikipedia.org/wiki/Virtual_private_server) like
[Digital Ocean,](https://www.digitalocean.com/)
[Linode](https://www.linode.com/),
[Google](https://cloud.google.com/appengine/), or
[Amazon](https://aws.amazon.com/). After setting up your server you can
register a domain at [Google Domains](http://domains.google.com) or
[NameCheap](https://www.namecheap.com/). The last step is editing your
DNS records to point your domain at your server. Now you can access your
website by navigating to your domain name. However, there is a problem
with this. Your VPS controls the hosting of your site and the domain
name service you went with maintains control of your domain. What
happens if your VPS goes down or the company you are using is suddenly
blacklisted in your country? What if [ICANN](https://www.icann.org/)
takes your domain from you? Or your domain name service shuts down?

While these are very unlikely they are important and get you thinking
about what would you do if you couldn’t host your website anymore or
your domain was taken away.

Using [IPFS (InterPlanetary File System)](http://ipfs.io) and [ENS
(Ethereum Name Service)](https://ens.domains/) you can host and serve
your website in a completely decentralized way.

IPFS is described as

> A peer-to-peer hypermedia protocol\
> designed to make the web faster, safer, and more open

You can think of IPFS as HTTP or like a CDN (Content Delivery Network).
It is a way of querying resources, except rather than the resources
being hosted at a few large data centers controlled by Google, Amazon,
etc. the files are decentralized and hosted across various nodes run by
anyone across the world.

HTTP looks up resources based on the URL, but IPFS uses hashes to look
up resources on its network.

An example of an IPFS hash is
QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv and can be accessed
through a gateway like
[Cloudfare](https://developers.cloudflare.com/distributed-web/ipfs-gateway/)
such as
[cloudflare-ipfs.com/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv](https://cloudflare-ipfs.com/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv).

This hash points to the starting files for hosting your own IPFS Node
and as you can see it only shows links to other files.

![](https://cdn-images-1.medium.com/max/800/1*Tj2ydbAkh_p81sNqOdStxQ.png)

QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv

But an IPFS hash can also point to a website such as
[tornado.cash](http://tornado.cash) (a crypto mixer) which just recently
was deployed to IPFS.

You can access it through the [ipfs.io](http://ipfs.io) gateway
[ipfs.io/ipfs/QmRvFZwyoJeMDCcdSiK15m7Vn2n1BFnz14WNwVxrhizzX5/](https://ipfs.io/ipfs/QmRvFZwyoJeMDCcdSiK15m7Vn2n1BFnz14WNwVxrhizzX5/).

In summary, IPFS provides a few major benefits

✅ Decentralized Content Network

✅ Immutable

✅ Censorship Resistant

### Deploying to IPFS {#6fa3 .graf .graf--h3 .graf-after--p name="6fa3"}

You can deploy your website to IPFS by starting your own node. First
download the [IPFS go implementation](https://dist.ipfs.io/#go-ipfs)
then open a terminal and run

``` {#e7fc .graf .graf--pre .graf-after--p name="e7fc"}
ipfs daemon 
```

You should then see the following output

``` {#c8a1 .graf .graf--pre .graf-after--p name="c8a1"}
Initializing daemon...go-ipfs version: 0.4.22-Repo version: 7System version: amd64/darwinGolang version: go1.12.7Swarm listening on /ip4/127.0.0.1/tcp/4001Swarm listening on /ip4/192.168.1.7/tcp/4001Swarm listening on /ip6/::1/tcp/4001Swarm listening on /p2p-circuitSwarm announcing /ip4/127.0.0.1/tcp/4001Swarm announcing /ip4/192.168.1.7/tcp/4001Swarm announcing /ip6/::1/tcp/4001API server listening on /ip4/127.0.0.1/tcp/5001WebUI: http://127.0.0.1:5001/webuiGateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080Daemon is ready
```

Now you are ready to pin your site

``` {#e57d .graf .graf--pre .graf-after--p name="e57d"}
ipfs add index.html
```

``` {#6048 .graf .graf--pre .graf-after--pre name="6048"}
added QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu index.html6 B / 6 B [=========================================================] 100.00%
```

In order to ensure that your site stays on the network, you can pin it
to your local node

``` {#ff18 .graf .graf--pre .graf-after--p name="ff18"}
ipfs pin add QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu
```

``` {#3d2c .graf .graf--pre .graf-after--pre name="3d2c"}
pinned QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu recursively
```

You can now navigate to the outputted hash through your gateway and see
your site
[ipfs.io/ipfs/QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu](https://ipfs.io/ipfs/QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu)

Pinning to your own node is great, however, what happens if your node
goes down or the file(s) you are hosting are deleted and your file(s)
are not yet propagated through the network.

A good rule of thumb is to add and pin your site to **three** IPFS
nodes. You could do this by creating your own [IPFS
cluster](https://cluster.ipfs.io/) or by using a popular pinning service
that already has nodes set up. Such as [Pintra](https://pinata.cloud/)
or [Temporal](https://temporal.cloud/).

For this example, we will be using Pintra. First, navigate to
[pintra.cloud](https://pinata.cloud/), sign up and navigate to the
upload tab

![](https://cdn-images-1.medium.com/max/800/1*ZbKajoiBcd9v2C0kVOQ7pQ.png)

[pinata.cloud/pinataupload](https://pinata.cloud/pinataupload)

Upload your single file or a directory for multiple files. You could
also pin the hash from when you added and pinned your file to your local
node to ensure that it propagates throughout the network.

If you are creating a web app with a framework such as React or Gatsby
you can upload your `build`{.markup--code .markup--p-code} or
`public`{.markup--code .markup--p-code} folder to Pintra. Or you can
check out [IPFS-Deploy](https://github.com/ipfs-shipyard/ipfs-deploy) to
deploy your sites to IPFS in one line.

Now our site is hosted on the decentralized censorship-resistant IPFS
network but navigating to
[ipfs.io/ipfs/QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu](https://ipfs.io/ipfs/QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu)
is very hard to remember, we need a domain name.

### Registering an ENS domain name {#82cd .graf .graf--h3 .graf-after--p name="82cd"}

The [Etheruem Name Service (ENS)](http://ens.domains) offers

> a secure & decentralised way to address resources both on and off the
> blockchain using simple, human-readable names.

Rather than registering a domain name on a site like [Google
Domains](http://domains.google.com), ENS is a non-profit organization
that offers `.eth`{.markup--code .markup--p-code} domains that are
immutable and registered on the Ethereum blockchain.

The primary goal of `.eth`{.markup--code .markup--p-code} domains was to
make cryptocurrency address human readable. However, ENS added support
for linking your domain to an IPFS hash so when a `.eth`{.markup--code
.markup--p-code} domain is entered into your browser it will resolve to
your website on IPFS.

For example, my `.eth`{.markup--code .markup--p-code} domain is
[kohorst.eth](http://kohorst.eth.link) if you type that domain into your
crypto wallet (if it has an ENS resolver) it will resolve to my ETH
address. More importantly, if you type `kohorst.eth/`{.markup--code
.markup--p-code} into your browser (if it has an ENS resolver like
[Brave](http://brave.com), if not you can type
`kohorst.eth.link`{.markup--code .markup--p-code} and it will resolve)
my personal website (hosted on IPFS) will resolve!

The first step is to purchase your ENS domain. Navigate to
`app.ens.domains`{.markup--code .markup--p-code} and search for your
domain name.

![](https://cdn-images-1.medium.com/max/800/1*fx49kUSr59jsXbXQEKvl_g.png)

**Note:**you will need Ether and a Web3 compatible browser/extension in
order to purchase an ENS domain. I personally use
[Metamask](http://metamask.io) and recommend
[this](https://medium.com/openberry/getting-started-with-metamask-b9ac23a10c83)
tutorial on getting started.

Select how many years you would like to purchase the domain for and
follow the purchasing steps.

After your sign and verify your transaction you will have to wait while
the transaction is verified on the Etheruem blockchain. After the
transaction completes you can click on your domain to manage it.

It will look something like this

![](https://cdn-images-1.medium.com/max/800/1*iC4djD89ViM_uU7wx2B60A.png)

[app.ens.domains/name/kohorst.eth](https://app.ens.domains/name/kohorst.eth)

There is a lot that you can add to your ENS domain your ETH address
along with other cryptocurrencies like BTC or LTC, your email, Github or
even Twitter user names. Most importantly you can add your IPFS hash.

Click on the add button and under `Content`{.markup--code
.markup--p-code} add the IPFS hash of your website

![](https://cdn-images-1.medium.com/max/800/1*8IvxiBsalLvJLiPFIHkn_A.png)

You will have to pay a
[gas](https://ethgasstation.info/blog/what-is-gas/) fee for the content
to be written to the blockchain and after the transaction is verified
you should be able to navigate to `yourdomain.eth.link`{.markup--code
.markup--p-code} and view your IPFS website!

### IPFS and regular domain name services {#f3fd .graf .graf--h3 .graf-after--p name="f3fd"}

Don’t have any Ether or don’t want your domain to end
in `.eth`{.markup--code .markup--p-code}? You can point your traditional
DNS to your IPFS hash so that you can keep your `.com`{.markup--code
.markup--p-code} domain. You can read more about it
[here](https://docs.ipfs.io/guides/concepts/dnslink/).

On [Google Domains](http://domains.google.com) in your DNS you will need
to register an A and AAAA record that points to the IP address of a IPFS
gateway. You can look up the IPv4 and IPv6 records for an IPFS gateway
(a good list of functioning gateways is available
[here](https://ipfs.github.io/public-gateway-checker/)) using
`nslookup`{.markup--code .markup--p-code}.

I use the `ipfs.io`{.markup--code .markup--p-code} gateway its records
are

``` {#c39b .graf .graf--pre .graf-after--p name="c39b"}
A    209.94.90.1AAAA 2602:fea2:2::1
```

Register these on your DNS and then create a TXT record with a [dns
link](http://dnslink.io/) value like

``` {#480c .graf .graf--pre .graf-after--p name="480c"}
"dnslink=/ipfs/<HASH>"
```

![](https://cdn-images-1.medium.com/max/800/1*0DTo7rOQmYbeEg0-ycykxA.png)

DNS Records for [lucakohorst.com](http://lucaskohorst.com)

That's it! Now your domain will point to your IPFS website.

* * * * *

[**Lucas Kohorst**\
kohorst.eth](http://kohorst.eth.link/ "http://kohorst.eth.link/")[](http://kohorst.eth.link/)

[**IPFS Powers the Distributed Web**\
*IPFS aims to surpass HTTP in order to build a better web for all of us.
Today's web is inefficient and expensive
HTTP…*ipfs.io](http://ipfs.io/ "http://ipfs.io/")[](http://ipfs.io/)

[**Ethereum Name Service**\
*ENS offers a secure & decentralized way to address resources both on
and off the blockchain using
simple…*ens.domains](https://ens.domains/ "https://ens.domains/")[](https://ens.domains/)

[**Pinata - Add Files To IPFS Effortlessly**\
*Pinata simplifies decentralized storage with our easy IPFS API and
toolkit. Our IPFS pinning service improves
your…*pinata.cloud](https://pinata.cloud/ "https://pinata.cloud/")[](https://pinata.cloud/)

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [January 13,
2020](https://medium.com/p/f5bca765f9ed).

[Canonical
link](https://medium.com/@lucaskohorst/decentralizing-your-website-f5bca765f9ed)

Exported from [Medium](https://medium.com) on March 5, 2020.
