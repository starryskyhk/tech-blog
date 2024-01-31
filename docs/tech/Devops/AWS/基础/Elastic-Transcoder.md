---
title: Elastic Transcoder
slug: /tech/devops/aws/basic/Elastic-Transcoder
tag: [AWS,"Elastic Transcoder"]
date: 2024-01-31T01:45
---
# Elastic Transcoder

**Amazon Elastic Transcoder**是一种在线媒体转码的工具，使用它我们可以很容易地将我们的视频从源格式转换到其他的格式和分辨

率，以便在手机、平板、PC等设备上播放。

一般来说，我们会将需要转码的媒体文件放在AWS S3的存储桶上，创建相应的管道和任务将文件转码为特定的格式，最后将文件输出到另一个S3的存储桶上面去。

我们也可以使用一些预设的模板来转换我们的媒体格式。

另外，我们也可以配合Lambda函数，在有新的文件上传到S3后触发函数代码，执行Elastic Transcoder并自动进行媒体文件的转码。