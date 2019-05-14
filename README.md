# ack-diff

react diff算法主要分为3个步骤:

1. Virtual DOM的生成
2. 比对Virtual DOM, 生成patches
3. 根据生成的patches与Virtual DOM融合，生成新的Virtual DOM
