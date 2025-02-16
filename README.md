# Trading Countdown Timer


## 项目需求
- input: timezone, period(1m, 5m, 15m, 30m)
- button: start and stop buttons
- UI: use tailwind as css
- react: use typescript
- 这是要一个循环倒计时的react app， 它会根据当前时区，以及当前时区的当前时间，还有倒计时的周期（比如1分钟，5分钟，15分钟，30分钟）来进行倒计时
- 比如现在是悉尼时区的8:00, period为5分钟，点击开始后，将会从5分钟倒计时直到0，时间为8点05，然后再开始新一轮的倒计时
- 如果现在时间是悉尼时区的8:02, period为5分钟，点击开始后，将会从3分钟倒计时到0，然后再开始新一轮的倒计时。
- 可选: 添加偏移量，比如2分钟，那么倒计时将会从整点后的2分钟后开始算起，默认为0

