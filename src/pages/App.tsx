import { InboxOutlined } from '@ant-design/icons'
import { Card, Divider, Radio, Space, Upload } from 'antd'
import Chroma from 'chroma-js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { colorList } from './ColorList'
import GltfViewer from './GltfViewer'

const { Dragger } = Upload

const View = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  padding: 24px;
`

const GltfView = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
`

const ColorBlock = styled.div`
  width: 32px;
  height: 32px;
`

const App: React.FC = () => {
  const [gltf, setGltf] = useState<string[]>([])
  const [option, setOption] = useState<string>('defaultColor')

  const handlePreview = useCallback((file) => {
    try {
      const reader = new FileReader()
      if (file) {
        reader.readAsText(file)
        reader.addEventListener('load', (event) => {
          const result = event.target?.result
          if (typeof result === 'string') {
            const data = JSON.parse(result)
            const dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            const newDataArray = dataArray.map(() => {
              data.timecode = Math.random()
              const blob = new Blob([JSON.stringify(data)], { type: 'application/octet-stream' })
              const dataURL = URL.createObjectURL(blob)
              return dataURL
            })
            setGltf(newDataArray)
          }
        })
      }
    } catch (e) {
      console.log('[readWorkflowFromFile]', e)
    }
  }, [])

  const defaultColor = colorList[option]

  return (
    <View>
      <Header>
        <div style={{ width: '50%' }}>
          <Radio.Group
            value={option}
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => setOption(e.target.value)}
            options={[
              { label: '浅-2', value: 'l1' },
              { label: '浅-1', value: 'l2' },
              { label: '默认', value: 'defaultColor' },
              { label: '深+1', value: 'd1' },
              { label: '深+2', value: 'd2' },
              { label: '深+3', value: 'd3' },
              { label: '深+4', value: 'd4' },
              { label: '深+5', value: 'd5' },
              { label: '深+6', value: 'd6' },
            ]}
          />
          <Divider />
          <div>{JSON.stringify(defaultColor)}</div>
        </div>
        <Dragger
          style={{ width: '40vw' }}
          maxCount={1}
          name="file"
          itemRender={() => null}
          beforeUpload={handlePreview}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag GLTF to this area to upload</p>
        </Dragger>
      </Header>
      <GltfView>
        {gltf.map((c, i) => (
          <Card
            size="small"
            style={{ width: '20%' }}
            key={i}
            title={
              <Space>
                <ColorBlock style={{ background: Chroma(defaultColor[i], 'rgb').hex() }} />
                {Chroma(defaultColor[i], 'rgb').hex()}
              </Space>
            }
          >
            <GltfViewer url={c} color={defaultColor[i]} />
          </Card>
        ))}
      </GltfView>
    </View>
  )
}

export default App
