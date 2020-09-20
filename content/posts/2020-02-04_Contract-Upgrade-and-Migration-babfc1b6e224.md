+++ 
date = "2020-02-04"
title = "Contract Upgrade and Migration"
slug = "contract-upgrade-and-migration" 
tags = ['Give Together', 'Blockchain', 'DeFi']
categories = []
+++

Two easy steps

Thank you to everyone that has already activated their DAI on [Give
Together](https://givetogether.app). Today we made needed changes to the
contract. There was a bug that did not forward rDAI to the charities
when sent to the contract. This has been fixed in [this
commit](https://github.com/Give-Together/contracts/commit/28632a163bc6653e4779cd3d10008eee788fa935).
In addition to the fix, a few new methods have been added, including one
to transfer ownership of the contact is necessary.

If you have activated your DAI on [Give
Together](https://givetogether.app) you will need to withdraw it and
then activate it again. This is due to how rDAI works. When you activate
your DAI it begins to wear a “hat” which specifies the beneficiary of
the interest generated. You can read more about rDAI
[here](https://github.com/rtoken-project/rtoken-contracts/#readme). In
the past the Give Together’s hat was \#61. We have now upgraded to hat
\#116 and the contract
[here](https://etherscan.io/address/0x931621613f1f1953adb085c2b06d664363e54aaf).

By withdrawing your activated DAI on Give Together and then activating
it again you can easily switch hats to the new contract. Note: you can
also change your hat directly by using the [rDAI proxy
contract](https://etherscan.io/address/0x261b45d85ccfeabb11f022eba346ee8d1cd488c0#writeProxyContract)
and calling the changeHat function with the input parameter as Give
Together’s new hat \#116.

1.  Withdraw your activated DAI

![](https://cdn-images-1.medium.com/max/800/1*AifPiS5SGP43MmwuuMxanQ.png)

Withdrawing activated DAI

​2. Activate it!

![](https://cdn-images-1.medium.com/max/800/1*u_AoVGe5e6L2bBjW4H_yZQ.png)

Activate your DAI

That’s it. Thank you for migrating your DAI to the new contract and
donating!

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [February 4,
2020](https://medium.com/p/babfc1b6e224).

[Canonical
link](https://medium.com/@lucaskohorst/contract-upgrade-and-migration-babfc1b6e224)

Exported from [Medium](https://medium.com) on March 5, 2020.
